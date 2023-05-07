const { createHash } = require("crypto");
const trie = require("../module/indexing")
const fs = require("fs")
const google = require("googlethis")

const data=fs.readFileSync(__dirname+'/search.json', 'utf8');
const words=JSON.parse(data);
console.log(words);

const index = async (req, res, next)=>{
    try{    
        const search_id = createHash("sha256").update("bacon").digest("hex");
        res.render("index",{title:"Space Browser",search_id:search_id})
    }catch(err){
        console.log(err)
    }
}

const search = async (req, res, next)=>{
    try{
        const query = req.query.q
        const options = {
            safe: false,
            parse_ads: false, 
            additional_params: { 
            hl: 'en' 
            }
        }
        let time = new Date().getTime()
        google.search(query, options).then(response=>{
            const total = response.results.length
            let ms = (new Date().getTime()) - time
            res.render("search",{title:"Space Browser",response,total,ms,query})
            if(response.results.length>0){
                response.people_also_ask.push(query)
            }
            if(Array.isArray(response.people_also_ask)){
                response.people_also_ask.forEach(async (data)=>{
                    data = data.toLowerCase()
                    data = data.slice(0,1).toUpperCase() + data.slice(1,data.length)
                    words.push(data)
                })
            }
            fs.writeFile(__dirname+"/search.json",JSON.stringify(words),(err,data)=>{})
        })
    }catch(err){
        console.log(err)
    }
}

const searchPost = async (req, res, next)=>{
    try{
        const prefix = req.body.prefix
    if(!Array.isArray(words)){
        res.json({status:true,response:"No words found!"})
    }else{
        trie.insert(words)
        const array = trie.prefix(prefix)
        if(array==false){
            res.json({status:true,response:"No words found!"})
        }else{
            res.json({status:true,response:array})
        }
    }
    }catch(err){
        console.log(err)
    }
}

module.exports = {index,search,searchPost}