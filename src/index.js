import pw from "playwright"

const main = async () => {
    const browser = await pw.firefox.launch({
        headless: true
    }) 

    const page = await browser.newPage();
    await page.goto("http://example.com/")
    const data = await page.$$eval("div", value => {
        const data = []
        value.forEach(datos => {
            const heading = datos.querySelector("h1").innerText;
            const param = datos.querySelector("p").innerText;
            data.push({ heading, param })
        })

        return data
    })

    console.log(data);
    await page.waitForTimeout(5000)
    browser.close()
}

main()