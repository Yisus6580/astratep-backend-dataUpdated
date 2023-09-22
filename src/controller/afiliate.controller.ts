import { Request, Response } from 'express';
import fs from 'fs';
import { IAfiliate, IAfiliateCreate } from '../interfaces/afiliate';
import AfiliateModel from '../models/afiliate.model';
import cloudinary from '../utils/cloudinary';
import sendResponse from '../utils/sendResponse';

// Crear
export const create = async (req: Request, res: Response) => {
  // Data mandada desde el body
  const data: IAfiliateCreate = req.body;

  try {
    // Verificamos que se suba una imagen
    if (req.file) {
      // Verificamos que el tamaño de la imagen no execeda el permitido // 3mb
      if (req.file.size > 1024 * 1024 * 3) {
        return sendResponse(res, 400, 'Bad Request Size');
      }

      // Verificamos que la extensión de la imagen sea valido
      if (
        req.file.mimetype !== 'image/jpeg' &&
        req.file.mimetype !== 'image/jpg' &&
        req.file.mimetype !== 'image/png'
      ) {
        return sendResponse(res, 400, 'Bad Request Format');
      }

      // Subir con Cloudinary
      await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: 'Astratep/Users/',
        },
        async (errors, result) => {
          // Verificamos si surgio algún error al subir la imagen
          if (errors) {
            return sendResponse(res, 400, 'Bad Request Upload Cloudinary');
          }

          // Asignamos la url de la imagen
          data.imageUrl = {
            publicId: result!.public_id,
            url: result!.secure_url,
          };
        }
      );
    }

    // Creamos un nuevo documento mandando la data
    // Y tambien nos devolvera el nuevo documento creado
    const newItem = await AfiliateModel.create(data);

    // Mandamos la respuesta con la data del nuevo documento junto al token
    sendResponse<IAfiliate>(res, 201, 'Created', {
      ...newItem.toObject(),
    });
  } catch (error: any) {
    // Eliminamos la imagen subida a Cloudinary en caso de haber salido mal la creación del item

    if (data.imageUrl) {
      await deleteCloudinaryImage(res, data.imageUrl.publicId);
    }
    // Mandamos el error capturado
    sendResponse(res, 500, `${error.message}`);
  } finally {
    if (req.file) {
      await removeTemporalImage(res, req.file.path);
    }
  }
};

const removeTemporalImage = async (res: Response, path: string) => {
  if (path) {
    await fs.unlink(path, (error) => {
      if (error) {
        // Mandamos el error capturado
        sendResponse(res, 500, error.message);
      }
    });
  }
};

// Función para eliminar la imagen de Cloudinary
const deleteCloudinaryImage = async (res: Response, publicId: string) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (error: any) {
    // Mandamos el error capturado
    sendResponse(res, 500, error.message);
  }
};
