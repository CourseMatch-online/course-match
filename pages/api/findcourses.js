// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fs = require('fs');
const pdf = require('pdf-parse');

export default (req, res) => {
  if (req.method === 'POST') {
    let dataBuffer = fs.readFileSync('path to PDF file...');
 
    pdf(dataBuffer).then(function(data) {
      //do pdf check
            
    });

    res.json({}); //response
  } else {
    // Handle any other HTTP method
  }
}
