function MoreWebsite(){
        // <div id="main" className="main">
        //     <h1 id="more-title">This is a title</h1>
        //     <div id="more-content">
        //         <p className="more-text">This is a paragraph</p>
        //         <p className="more-text">This is a paragraph</p>
        //         <img src="https://picsum.photos/200/300" alt="random image" />
        //     </div>
        // </div>
    
    const main = document.createElement('div');
    main.id = 'main';
    main.className = 'main';

    const title = document.createElement('h1');
    title.style = "margin-top: 10%";
    title.id = 'more-title';
    title.textContent = 'This is a title';

    const content = document.createElement('div');
    content.id = 'more-content';

    const paragraph1 = document.createElement('p');
    paragraph1.className = 'more-text';
    paragraph1.textContent = 'This is a paragraph';

    const paragraph2 = document.createElement('p');
    paragraph2.className = 'more-text';
    paragraph2.textContent = 'This is a paragraph';

    const image = document.createElement('img');
    image.src = 'https://picsum.photos/200/300';
    image.alt = 'random image';

    content.appendChild(paragraph1);
    content.appendChild(paragraph2);
    content.appendChild(image);

    main.appendChild(title);
    main.appendChild(content);

    return main;
}

export default MoreWebsite;