document.getElementById("search-result").style.display = "none"

function suggestions(input){
    if(input=="" || input==null){
        document.getElementById("search-result").style.display = "none"
        document.getElementById("search-result").innerHTML=null
        return
    }
        $.post("/search",{
            prefix:input
        },function(response){
            if(response.status){
                let text = ''
                if(Array.isArray(response.response)){
                    response.response.forEach(element => {
                        const myString = element;
                        const firstChar = myString.slice(0, 1).toUpperCase();
                        const restOfChars = myString.slice(1).toLowerCase();
                        const capitalizedString = firstChar + restOfChars;
                        text += `<p onclick="apply('${capitalizedString}')" class="cursor-pointer text-white">${capitalizedString}</p><hr>`
                    });
                    document.getElementById("search-result").style.display = ""
                    document.getElementById("search-result").innerHTML=text
                }else{
                    document.getElementById("search-result").style.display = "none"
                    document.getElementById("search-result").innerHTML=null
                }
            }
        })
}

function apply(value){
    console.log(value);
    document.getElementById("search").value=value
    document.getElementById("search-result").innerHTML=null
    document.getElementById("search-result").style.display = "none"
}