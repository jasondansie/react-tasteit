const http = require('http');

const port = process.env.PORT || 3040;
const host = process.env.HOST || "localhost";

const { getAllRecipes, getRecipe } = require('./recipeStorage');

const server = http.createServer((req, res) => {
    const {
        pathname,
        searchParams
    } = new URL(`http://${req.headers.host}${req.url}`);

    const route = decodeURIComponent(pathname);

        let result = [];

        if (route === '/recipes') {
            result = getAllRecipes();
        }
        else if(route === pathname){
            let value = pathname.substring(17);
            console.log("params: ",pathname.substring(17));
            result = getRecipe('id', Number(value));
        }
        else{
            console.log( "string: ", searchParams.get('value'));
            result = {message: "data not found"};
        }

        res.writeHead(200,{ 
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });

        res.end(JSON.stringify(result,null,2));
})

server.listen(port,host, ()=>console.log(`Server running on ${host} port ${port}`));