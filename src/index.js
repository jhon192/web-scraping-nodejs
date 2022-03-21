import pw from "playwright"
import fs from 'fs';

const main = async () => {
    const browser = await pw.firefox.launch({
        headless: true
    }) 

    const page = await browser.newPage();
    await page.goto("https://www.mangatigre.com/")
    const data = await page.$$eval(".popular-box", value => {
        const data = []
        value.forEach(datos => {
            const animeName = datos.querySelector(".name").innerText;
            data.push(animeName + "\n")
        })

        return data

    })

    console.log(data);
    fs.writeFile("animeList.txt", `${data}\n`, "utf-8", err => err)
    await page.waitForTimeout(5000)
    browser.close()
}

main()