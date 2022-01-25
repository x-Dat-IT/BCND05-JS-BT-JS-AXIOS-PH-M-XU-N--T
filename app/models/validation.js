function Validation(){
    this.checkEmpty = function(value,spanID, message){
        if(value.trim() == ''){
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = 'block';
            return false;
            
        }
        document.getElementById(spanID).innerHTML = '';
        document.getElementById(spanID).style.display = 'none';
        return true;
    }
    this.checkTaiKhoan = function(value,spanID,message,mangND) {
        var isExist = false;
        isExist = mangND.some(function(nd){
            return nd.taiKhoan == value;
        });
        if(isExist) {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = 'block';
            return false;
            
        }
        document.getElementById(spanID).innerHTML = '';
        document.getElementById(spanID).style.display = 'none';
        return true;
    }
    this.checkName = function(value,spanID, message) {
        var patternString = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$"
        var pattern = new RegExp(patternString);
        if(pattern.test(value)){
            document.getElementById(spanID).style.display = 'none';
            document.getElementById(spanID).innerHTML = '';
            return true;
        }
        document.getElementById(spanID).style.display = 'block';
        document.getElementById(spanID).innerHTML = message;
        return false;
    }   
    this.checkPass = function(value, spanID, message){
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if(value.match(pattern)){
            document.getElementById(spanID).style.display = 'none';
            document.getElementById(spanID).innerHTML = '';
            return true;
        }
        document.getElementById(spanID).style.display = 'block';
        document.getElementById(spanID).innerHTML = message;
        return false;
    }
    this.checkEmail = function(value, spanID, message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(value.match(pattern)){
            document.getElementById(spanID).style.display = 'none';
            document.getElementById(spanID).innerHTML = '';
            return true;
        }
        document.getElementById(spanID).style.display = 'block';
        document.getElementById(spanID).innerHTML = message;
        return false;
        
    }
    this.checkSelect = function(selectID, spanID, message){
        
        if(document.getElementById(selectID).selectedIndex != 0){
            document.getElementById(spanID).style.display = 'none';
            document.getElementById(spanID).innerHTML = '';
            return true;
        }
        document.getElementById(spanID).style.display = 'block';
        document.getElementById(spanID).innerHTML = message;
        return false;
    }
    this.checkTextArea = function(textID, spanID, message){
        if(document.getElementById(textID).value.length > 60){
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = 'block';
            return false;
            
        }
        document.getElementById(spanID).innerHTML = '';
        document.getElementById(spanID).style.display = 'none';
        return true;
        
    }
}