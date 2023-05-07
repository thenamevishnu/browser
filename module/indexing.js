class Node{
    constructor(){
        this.child = {}
        this.isEnd = false
    }
}

class Trie{
    constructor(){
        this.root = new Node()
    }

    insert(words){
        words.forEach(word => {
            let currentNode=this.root
            for(let i=0;i<word.length;i++){
                const letter = word[i]
                if(!(letter in currentNode.child)){
                    currentNode.child[letter]=new Node()
                }
                currentNode=currentNode.child[letter]
            }
            currentNode.isEnd=true
        });
    }

    traverse(currentNode=this.root,prefix="",words=[]){
        if(currentNode.isEnd){
            words.push(prefix)
        }
        for(let child in currentNode.child){
            this.traverse(currentNode.child[child],prefix + child, words)
        }
        return words.slice(0,10)
    }

    prefix(word){
        let currentNode=this.root
        for(let i=0;i<word.length;i++){
            const letter = word[i]
            if(!(letter.toLowerCase() in currentNode.child) && !(letter.toUpperCase() in currentNode.child)){
                return false
            }
            const up = letter.toUpperCase()
            const low = letter.toLowerCase()
            currentNode=currentNode.child[up] ? currentNode.child[up] : currentNode.child[low]
        }
        return this.traverse(currentNode,word,this.words=[])
    }
}


const trie = new Trie()

module.exports = trie