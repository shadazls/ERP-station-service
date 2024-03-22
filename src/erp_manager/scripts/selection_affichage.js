let selection = document.getElementById('slct')

selection.addEventListener("change", () => {
    if(selection.options[selection.selectedIndex].text == "Caisse") window.location = 'http://localhost:8888/src/erp_cash_desk/employee.html'
    else window.location = 'http://localhost:8888/src/erp_manager/manager.html'
})