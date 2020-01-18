const PDFDocument = require('pdfkit')
const fs = require('fs')

module.exports = {
	createInvoicePdf: (option, savePath) => new Promise((resolve, reject) => {

		const doc = new PDFDocument({
			Title: option.title || '',
			Author: option.author || ''
		});

		doc.fontSize(25).text(`${option.carBrand} ${option.carModel}`, 100, 80, { align: 'justify' });

		doc.fontSize(14)
			.text(`Stimate domn ${option.clientName} \n\nMai jos am atasat detalii pentru masina ${option.carBrand} ${option.carModel} impreuna cu mai multe detalii.\nPentru orice informatie suplimentara va stam la dispozitie telefonic la 073552222 cat si la adresa de mail servicetestdev@gmail.com \n\n`, 100, 150)
		doc.fontSize(14)
			.text(`Pret ${option.price} \n\n\n\n`)
		
		let file = `${savePath}/${Date.now()}.pdf`
		
		doc.pipe(fs.createWriteStream(file))
			.on('finish', () => resolve({ name: file }))
			.on('error', () => reject({ error: 'Error when creating pdf' }));

		doc.end();
	})
}