export function resetController(isNoneSelected:any, controllerVal: any, cntlr: any, fullController:any, noneAboveController: any){
    // by: @leonkoech
    //purpose: function resets the form to appropriate values when "none" or equivalent is selected

     if(isNoneSelected){
       controllerVal.reset();
       controllerVal.setValue(noneAboveController);
       console.log(controllerVal.value);
     }
     else{
       cntlr = fullController;
     }
}
