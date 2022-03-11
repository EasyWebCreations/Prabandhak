const express = require ("express")

const app = express();

app.get("/",function(request,response)
{
    response.sendFile(__dirname + "/index.html")
});
app.use(express.static("public"));
app.get("/dashboard",function(request,response)
{
    response.sendFile(__dirname + "/dashboard.html")
});

app.listen(3000,function()
{
    console.log("Server started!!")
});