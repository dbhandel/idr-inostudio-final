import fs from 'fs';
import { db, conn } from '../db';
import uuid from 'uuid';
import path from 'path';
import PDFDocument from 'pdfkit';
import  Jimp from 'jimp';

/* S3 cloud helper*/
import s3 from '../s3';

/* sql queries*/
import sql from '../sql';

const TEMP_PDF_DOC_FILE = 'temp.pdf';
const TEMP_PDF_DOC_FILE_PATH = path.resolve(__dirname, TEMP_PDF_DOC_FILE);

/**
 * Upload files. Get files from ctx.request.body
 * Save file to S3 cloud and db
 * @param {object} ctx - Koa context object
 */
export async function upload(ctx) {
  const files = ctx.request.body.files;
  const filesCount = Object.keys(files).length;
  let step = 1;
  let isFirstPage = true;

  /* use temp.pdf file for add images to pdf doc */
  const pdf = new PDFDocument;
  const writeStream = fs.createWriteStream(TEMP_PDF_DOC_FILE_PATH);
  pdf.pipe(writeStream);

  for (const f in files) {
    const file = files[f];
    if (['image/png', 'image/jpeg', 'image/jpg'].indexOf(file.type) > -1) {

      /* processing image */
      Jimp.read(file.path).then(function(image) {
          const imgPath = path.resolve(__dirname, file.name);
          if(image.bitmap.width>612) {
            image.scaleToFit(612, Jimp.AUTO);
          }

          image.write(imgPath, function(err) {

            /* each images should be on new page*/
            if (step !== 1) {
              pdf.addPage();
            }

            /* add image to pdf page*/
            pdf.image(imgPath, 0, 0);

            /* end() pdf if all images were added */
            if (filesCount === step) {
              pdf.end();
            }
            step++;
            fs.unlink(imgPath, () => {

            })
          });
        }
      ).catch(function(err) {
        console.error(err);
      });

    }
    else if (file.type === 'application/pdf') {
      uploadToS3AndSaveToDB(file.name, file.path);
    }
    else if(file.type==="application/doc"){

    }
    else {

    }

  }

  writeStream.on('finish', function() {
    uploadToS3AndSaveToDB(TEMP_PDF_DOC_FILE, TEMP_PDF_DOC_FILE_PATH);
  });
}

async function uploadToS3AndSaveToDB(fileName, filePath) {
  fs.readFile(filePath, function(err, data) {
    if (err) {
      // Something went wrong!
      throw err;
    }

    const params = {
      Key: uuid.v4() + "_" + fileName,
      Body: data
    };
    console.log("!!!!");
    /*  s3.upload(params, function(err, data) {
     // Whether there is an error or not, delete the temp file
     fs.unlink(file.path, function(err) {
     if (err) {
     console.error(err);
     }
     console.log('Temp file ' + file.name + ' delete');
     });

     if (err) {
     console.error(err.message);
     }
     else {
     /!* Save doc on db *!/
     const newDocRow = {
     id: uuid.v4(),
     name: file.name,
     path: data.Location,
     user_id: ctx.state.user.id,
     };

     conn.none(sql.docs.insert, newDocRow)
     .then(() => {
     ctx.body = { success: true };
     })
     .catch(function(err) {
     console.log(err);
     });
     }
     });*/
  });
}

export async function getForCurrentUser(ctx) {
  await conn.manyOrNone(sql.docs.getOnUser, { user_id: ctx.state.user.id })
    .then((data) => {
      ctx.body = data;
    })
    .catch(function(err) {
      console.log(err);
    });
}

