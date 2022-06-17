const emailTemplate = (name, otp) => {
  return `
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:800px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">SecondHand Official</a>
                  </div>
                  <p style="font-size:1.1em">Hello ${name},</p>
                  <p>Kami menerima permintaan untuk mengatur ulang kata sandi Anda.
                  Masukkan kode reset kata sandi berikut: </p>
                  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                  <p style="text-align:center; font-style:italic; color:#808080;">kode reset hanya akan berlaku selama 15 menit</p>
                  <p>Jika Anda tidak meminta untuk mengatur ulang kata sandi, abaikan email ini.</p>
                  <p style="font-size:0.9em;">Regards,<br />SecondHand Official</p>
                  <hr style="border:none;border-top:1px solid #eee" />
                  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>US Game Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>California</p>
                  </div>
                </div>
              </div>`;
};

module.exports = emailTemplate;
