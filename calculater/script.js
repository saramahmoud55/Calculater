 class Calculator{
     constructor(previousOprendButtons ,currentOprendButtons){
         this.previousOprendButtons=previousOprendButtons
         this.currentOprendButtons=currentOprendButtons
         this.clear()
     }
     clear(){
        this.currentOprend =''
        this.previousOprend =''
        this.operation =undefined

     }
     delete(){
         this.currentOprend=this.currentOprend.toString().slice(0,-1)

     }
     appendNumber(number){
         if(number === '.' && this.currentOprend.includes('.'))
         return
        this.currentOprend=this.currentOprend.toString() +  number.toString()
     }
     chooseOperation(operation){
         if(this.currentOprend ==='')
         return
         if(this.previousOprend !== ''){
             this.compute()
         }
        this.operation=operation
        this.previousOprend=this.currentOprend
        this.currentOprend=''
     }
     compute(){
         let computation 
         const prev=parseFloat(this.previousOprend)
         const current =parseFloat(this.currentOprend)
         if(isNaN(prev) || isNaN(current))
         return
         switch(this.operation){
             case '+':
                 computation= prev + current
                 break
             case '-':
                 computation= prev  - current
                 break
             case '*':
                 computation= prev * current
                 break
             case '/':
                 computation= prev /  current
                 break
                 default:
                     return
         }
         this.currentOprend =computation
         this.operation=undefined
         this.previousOprend=''
     }
     getDisplayNumber(number){
         const stringNumber =number.toString()
         const integer =parseFloat(stringNumber.split('.')[0])
         const decimal =stringNumber.split('.')[1]
       let integerDisplay
       if(isNaN(integer)){
           integerDisplay=''
       }else{
           integerDisplay= integer.toLocaleString('en',{
        maximumFractionDigits:0 })
       }
       if(decimal!=null){
           return`${integerDisplay}.${decimal}`
       }else{
           return integerDisplay
       }
     }
     updateDisplay(){
        this.currentOprendButtons.innerText=this.getDisplayNumber(this.currentOprend)
        if(this.operation != null){
        this.previousOprendButtons.innerText=`${this.getDisplayNumber(this.previousOprend)} ${this.operation}`
     }else{
         this.previousOprendButtons.innerText=''
     }
    }
     
 }

 const numberButtons =document.querySelectorAll('[data-number]')
 const operationButtons =document.querySelectorAll('[data-operation]')
 const equalsButtons =document.querySelector('[data-equals]')
 const deleteButtons =document.querySelector('[data-delete]')
 const allClearButtons =document.querySelector('[data-all-clear]')
 const previousOprendButtons =document.querySelector('[data-previous-operand]')
 const currentOprendButtons =document.querySelector('[data-current-operand]')

const calculator =new Calculator(previousOprendButtons,currentOprendButtons)
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButtons.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButtons.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButtons.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})