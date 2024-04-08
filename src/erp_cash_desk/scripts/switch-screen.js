var currentPage = window.location.pathname;

var select = document.getElementById('slct');

select.addEventListener('change', function() {
    var selectedValue = select.value;
    
    if (currentPage.includes('erp_cash_desk')) {
        if (selectedValue === '1') {
            window.location.href = '/src/erp_manager/manager.html';
        }
    } else if (currentPage.includes('erp_manager')) {
        if (selectedValue === '0') {
            window.location.href = '/src/erp_cash_desk/employee.html';
        }
    }
});
