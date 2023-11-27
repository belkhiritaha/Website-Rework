let db = {};

fetch("websites/layout.json").then((res) => res.json()).then((data) => {
    console.log(data);
    // write to db
    db = data;
});


function MoreWebsite(id){
    let websiteToRender = db.websites[id];
    console.log(websiteToRender);
    const main = document.createElement('div');
    main.id = 'main';
    main.className = 'main';

    const title = document.createElement('h1');
    title.style = "margin-top: 10%";
    title.id = 'more-title';
    title.textContent = websiteToRender.title;

    main.appendChild(title);

    for (let i = 0; i < websiteToRender.layout.length; i++) {
        let element = websiteToRender.layout[i];
        let htmlElement;
        console.log(element);
        // element is type : {type: "p", content: "text"} or {type: "img", content: "url"} or {type: "a", content: ["url", "link"]}

        switch (element.type) {
            case "p":
                htmlElement = document.createElement('p');
                htmlElement.textContent = element.content;
                break;
            case "h2":
                htmlElement = document.createElement('h1');
                htmlElement.textContent = element.content;
                break;
            case "img":
                htmlElement = document.createElement('img');
                htmlElement.src = element.content;
                break;
            case "a":
                htmlElement = document.createElement('a');
                htmlElement.href = element.content[1];
                let linkImage = document.createElement('img');
                linkImage.src = element.content[0];
                htmlElement.appendChild(linkImage);
                break;
            default:
                htmlElement = document.createElement('p');
                htmlElement.textContent = element.content;
                break;
        }

        // if (element == 0){
        //     htmlElement = document.createElement('p');
        //     htmlElement.textContent = websiteToRender.content[i];
        // }

        // if (element == 1){
        //     htmlElement = document.createElement('h1');
        //     htmlElement.textContent = websiteToRender.content[i];
        // }

        // if (element == 2){
        //     htmlElement = document.createElement('img');
        //     htmlElement.src = websiteToRender.content[i];
        // }

        // if (element == 3){
        //     htmlElement = document.createElement('a');
        //     htmlElement.href = websiteToRender.content[i][1];
        //     let linkImage = document.createElement('img');
        //     linkImage.src = websiteToRender.content[i][0];
        //     htmlElement.appendChild(linkImage);
        // }
        
        main.appendChild(htmlElement);
    };

    return main;
}

export default MoreWebsite;
