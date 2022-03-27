import pw from "playwright"
import fs from 'fs';

const main = async (text) => {
    const browser = await pw.firefox.launch({
        headless: true
    }) 

    const page = await browser.newPage();
    await page.goto(`https://translate.google.com/?sl=es&tl=en&text=${text}&op=translate`)
    const data = await page.$$eval(".J0lOec", value => {
        const data = []
        value.forEach((datos) => {
            const translateData = datos.querySelector("span").innerText;
            data.push(translateData + ".")
        })

        return data

    })

    data.map(x => {
      console.log(x);  
    });
    // fs.writeFile("animeList.txt", `${data}\n`, "utf-8", err => err)
    await page.waitForTimeout(1000)
    browser.close()
}

main("Que haremos hoy?")