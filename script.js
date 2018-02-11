//const SHA256 = require("crypto-js/sha256"); 
var counter = 0;
const button = document.getElementById('register');
const email =document.getElementById('email').value;
const password = document.getElementById('Password').value;
const aadhar = document.getElementById('Aadhaar').value;
class Block { 
constructor(index, timestamp, data, previousHash ) { 
this.index = index; 
this.previousHash = previousHash; 
this.timestamp = timestamp; 
this.data = data; 
this.email = email;
this.password = password;
this.aadhar = aadhar;
this.hash = this.calculateHash(); 
} 

calculateHash() 
{ 
return (this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString(); 
} 

}
class Blockchain{
//Section 1 Genesis block creation
 constructor() { 
this.chain = [this.createGenesisBlock()]; 
} 

createGenesisBlock() 
{
 return new Block(0, "01/01/2019", "Genesis block", "0"); 
} 

//section 2 adding new blocks

getLatestBlock() { 
return this.chain[this.chain.length - 1]; 
} 

addBlock(newBlock) { 
counter +=1;
//newBlock.index = counter;
newBlock.previousHash = this.getLatestBlock().hash; 
newBlock.hash = newBlock.calculateHash(); 
this.chain.push(newBlock); 
console.log(newBlock);
} 

//section 3 validating the chain

isChainValid() 
{ 
for (let i = 1; i < this.chain.length; i++){ 
const currentBlock = this.chain[i]; 
const previousBlock = this.chain[i - 1]; 
if (currentBlock.hash !== currentBlock.calculateHash()) { 
return false; 
} 
if (currentBlock.previousHash !== previousBlock.hash){ 
return false; 
} 

} 

return true; 

} 

}
var obj = new Blockchain();
function onclickRegister(){
  
     obj.addBlock(new Block(0, "01/01/2039", "Genesis block", "0"));
     console.log(obj.chain);
    

    if (validate((document.getElementById('Aadhaar').value).toString(12).split("").map(function(t){return parseInt(t)})))
        window.prompt('Valid');

    else 
        window.prompt('Invalid');
}



    var d=[
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], 
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], 
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], 
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], 
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], 
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], 
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], 
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], 
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];

// permutation table p
var p=[
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], 
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], 
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], 
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], 
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], 
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], 
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

// inverse table inv
var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

// converts string or number to an array and inverts it
function invArray(array){
    
    if (Object.prototype.toString.call(array) == "[object Number]"){
        array = String(array);
    }
    
    if (Object.prototype.toString.call(array) == "[object String]"){
        array = array.split("").map(Number);
    }
    
	return array.reverse();
	
}

// generates checksum
function generate(array){
    	
	var c = 0;
	var invertedArray = invArray(array);
	
	for (var i = 0; i < invertedArray.length; i++){
		c = d[c][p[((i + 1) % 8)][invertedArray[i]]];
	}
	
	return inv[c];
}

// validates checksum
function validate(array) {
    
    var c = 0;
    var invertedArray = invArray(array);
    
    for (var i = 0; i < invertedArray.length; i++){
    	c=d[c][p[(i % 8)][invertedArray[i]]];
    }

    return (c === 0);
}
    



    


//button.addEventListener('click',onclickRegister());




