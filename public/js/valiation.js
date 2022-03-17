$(".validation").focusout(function() {
    var val = this.value;

    if (this.id == "FIRM") {
        if (val == null || val == "") {
            swal("Caution", "Please Select Company", "warning");
        }
    }
    if (this.id == "EMP_MOBILE") {
        if (val.length < 10) {
            swal("Caution", "Enter valid Mobile Number", "warning");
        }
    }
    if (this.id == "EMP_NAME") {
        if (val == null || val == "") {
            swal("Caution", "Enter Name", "warning");
        }
    }
    if (this.id == "EMP_ADDRESS") {
        if (val == null || val == "") {
            swal("Caution", "Enter Address", "warning");
        }
    }
    if (this.id == "AADHAR") {
        if (val.length < 12) {
            swal("Caution", "Enter Valid Aadhar", "warning");
        }
    }
    if (this.id == "PAN") {
        if (val.length < 10) {
            swal("Caution", "Enter valid PAN no", "warning");
        }
    }
    if (this.id == "UAN_NO") {
        if (val == null || val == "") {
            swal("Caution", "Enter UAN_NO", "warning");
        }
    }
    if (this.id == "ESIC_NO") {
        if (val == null || val == "") {
            swal("Caution", "Enter ESIC", "warning");
        }
    }
    if (this.id == "BANK_AC_NO") {
        if (val == null || val == "") {
            swal("Caution", "Enter Bank Acc no.", "warning");
        }
    }
    if (this.id == "IFSC_CODE") {
        if (val == null || val == "") {
            swal("Caution", "Enter IFSC Code.", "warning");
        }
    }

    if (this.id == "BNK_NAME") {
        if (val == null || val == "") {
            swal("Caution", "Enter Bank Name", "warning");
        }
    }
    if (this.id == "BNK_ADDRESS") {
        if (val == null || val == "") {
            swal("Caution", "Enter Bank Address", "warning");
        }
    }
    if (this.id == "BANK_AC_NO") {
        if (val == null || val == "") {
            swal("Caution", "Enter Acc no", "warning");
        }
    }
    if (this.id == "IFSC_CODE") {
        if (val == null || val == "") {
            swal("Caution", "Enter IFSC Code", "warning");
        }
    }
    if (this.id == "BNK_NAME") {
        if (val == null || val == "") {
            swal("Caution", "Enter Bank Name", "warning");
        }
    }
    if (this.id == "BNK_ADDRESS") {
        if (val == null || val == "") {
            swal("Caution", "Enter Bank Address", "warning");
        }
    }
    if (this.id == "CATEGORY") {
        if (val == null || val == "") {
            swal("Caution", "Enter Category", "warning");
        }
    }
    if (this.id == "DESIGNATION") {
        if (val == null || val == "") {
            swal("Caution", "Enter Designation", "warning");
        }
    }
    if (this.id == "BASIC_SAL") {
        if (val == null || val == "") {
            swal("Caution", "Enter BASIC_SAL", "warning");
        }
    }
    if (this.id == "HRA_SAL") {
        if (val == null || val == "") {
            swal("Caution", "Enter HRA_SAL", "warning");
        }
    }
    if (this.id == "SPL_ALLOW") {
        if (val == null || val == "") {
            swal("Caution", "Enter SPL_ALLOW", "warning");
        }
    }
});
$(".validation").focusout(function() {
    if (
        this.id == "HRA_SAL" ||
        this.id == "BASIC_SAL" ||
        this.id == "SPL_ALLOW"
    ) {
        var hra = document.getElementById("HRA_SAL").value;
        var basic = document.getElementById("BASIC_SAL").value;
        var allow = document.getElementById("SPL_ALLOW").value;
        hra = isNaN(hra) ? 0 : parseInt(hra);
        basic = isNaN(basic) ? 0 : parseInt(basic);
        allow = isNaN(allow) ? 0 : parseInt(allow);

        var val = hra + allow + basic;
        console.log(hra, basic, allow);
        document.getElementById("CTC").innerHTML = val;
    }
});