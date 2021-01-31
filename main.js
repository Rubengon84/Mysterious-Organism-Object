// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// return an pAequor Object organism with some methods. 
const pAequorFactory = (n , array) => {
  obj = {
         specimenNum: n,
         dna: array,

         mutate (){
                  let randomBase = Math.floor(Math.random() * 15); // Choose a random base and change for a new different base.
                  let base = this.dna[randomBase];
                  let baseNew = returnRandBase();
                  while ( base === baseNew) {  //Avoid the new base to be the same as the old one.
                    baseNew = returnRandBase();
                  }
                  this.dna[randomBase] = baseNew;
                  return this.dna;
                }, 

         compareDNA (pAobj) { //Compare the Dna bases of this object with other Dna bases from other object. 
                 let count = 0;
                 let firstChain = pAobj.dna;
                 let secondChain = this.dna;
                 for (let i =0; i< firstChain.length; i++){//loop to compare the Dna chains.
                   if(firstChain[i] === secondChain[i]){
                     count = count + 1;
                   };
                 }
                 let porcent = (count * 100) / 15 ;
                 console.log(`Specimen #${this.specimenNum} and Specimen #${pAobj.specimenNum} have ${porcent} % bases in comon.` );                  
         },
         
         willLikelySurvive() {// Check if the bases of this object are 60% or more of C & G.(it needs for pAequor organism to survive) return true or false.
           let countBases = 0;
           let bases = this.dna;
           bases.forEach(element => {
             if(element === 'C' || element === 'G') {
               countBases = countBases + 1;
             }  
           });
           let porcent = (countBases * 100) / 15 ;
             if (porcent >= 60) {
               return true;
             }
             else{
               return false;
             };
         },

         complementStrand() {//Return  a complement Strand of Dna bases for the actual Dna bases.
           let complementChain = [];
           let dnaChain = this.dna;
           dnaChain.forEach( element => {
               if(element === 'A'){
                 complementChain.push('T');
               } else if(element === 'T'){
                 complementChain.push('A');
               } else if (element === 'C') {
                 complementChain.push('G');
               } else if (element === 'G') {
                 complementChain.push('C')
               }
           });
           return complementChain;
         }

        };
  return obj;
};


function setUp () {// Make an Array of 30 pAequor Objects that have 60% or more of bases with 'C' or 'G'.
  let arrayPaequor = [];
  for(let i=0; i<30; i++) {
    let name = 'pAequor' + i;
    name = pAequorFactory(i, mockUpStrand())
    while (!name.willLikelySurvive()){ // Check if the pAequor Object can survive, if not, create anothe one.
      name = pAequorFactory(i, mockUpStrand());
    }
    arrayPaequor.push(name);
    console.log(name);
  }

  return arrayPaequor;
};
  

