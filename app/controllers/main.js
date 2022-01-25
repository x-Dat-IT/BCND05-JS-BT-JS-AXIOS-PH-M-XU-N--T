var ndSerVices = new NguoiDungServices();
var validation = new Validation();
var mangND = [];
var taiKhoan = getEle('TaiKhoan');
var hoTen = getEle('HoTen');
var matKhau = getEle('MatKhau');
var email = getEle('Email');
var hinhAnh = getEle('HinhAnh');
var loaiND = getEle('loaiNguoiDung');
var ngonNgu = getEle('loaiNgonNgu');
var moTa = getEle('MoTa');
function getEle(ele) {
    return document.getElementById(ele);
}

function getTaiKhoan(mangND) {
    return mangND;
}

function layDSND() {
    ndSerVices.layDS()
        .then(function (result) {
            hienThiTable(result.data);
            mangND = result.data;
            getEle('btnThemNguoiDung').addEventListener('click', function () {
                resetForm();
                getEle('TaiKhoan').disabled = false;
                document.querySelector('.modal-title').innerHTML = 'Thêm người dùng';
                document.querySelectorAll('.invalid-feedback').forEach(function (item) {
                    item.style.display = 'none';
                });
                document.querySelector('.modal-footer').innerHTML = ` <button id="btn-them" class="btn btn-success" onclick="themNguoiDung(getTaiKhoan(mangND))" >Thêm</button>`;
            });
            kiemTraBangBanPhim(mangND);
           
        })
        .catch(function (error) {
            console.log(error);
        })

}
layDSND();

// Kiểm tra bằng onkeyup
function kiemTraBangBanPhim(mangND){
     getEle('TaiKhoan').onkeyup = function () {
        var isValid = true;
        isValid &= validation.checkTaiKhoan(taiKhoan.value, 'spanTk', 'Tài khoản đã tồn tại', mangND);
    }
    getEle('HoTen').onkeyup = function () {
        var isValid = true;
        isValid &= validation.checkEmpty(hoTen.value, 'spanHoTen', 'Họ tên không được để trống') && validation.checkName(hoTen.value, 'spanHoTen', 'không chứa số và ký tự đặc biệt');
    }
    getEle('MatKhau').onkeyup = function () {
        var isValid = true;
        isValid &= validation.checkEmpty(matKhau.value, 'spanMatKhau', 'Mật khẩu không được để trống') && validation.checkPass(matKhau.value, 'spanMatKhau', 'Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8');
    }
    getEle('Email').onkeyup = function () {
        var isValid = true;
        isValid &= validation.checkEmpty(email.value, 'spanEmail', 'Email không được để trống') && validation.checkEmail(email.value, 'spanEmail', 'Email phải đúng định dạng');
    }
    getEle('HinhAnh').onkeyup = function () {
        var isValid = true;
        isValid &= validation.checkEmpty(hinhAnh.value, 'spanHinhAnh', 'Hình ảnh không được để trống');
    }
    getEle('loaiNguoiDung').onchange = function () {
        var isValid = true;
        isValid &= validation.checkSelect('loaiNguoiDung', 'spanLoaiND', 'Phải chọn loại người dùng');

    }
    getEle('loaiNgonNgu').onchange = function () {
        var isValid = true;
        isValid &= validation.checkSelect('loaiNgonNgu', 'spanloaiNN', 'Phải chọn loại ngôn ngữ');

    }
    getEle('MoTa').onkeyup = function () {
        var isValid = true;
        isValid &= validation.checkEmpty(moTa.value, 'spanMota', 'Mô tả không được để trống') && validation.checkTextArea('MoTa', 'spanMota', 'Mô tả không được vượt quá 60 kí tự');
    }
}
function hienThiTable(mangUsers) {
    var content = "";
    var count = 1;
    mangUsers.map(function (user) {
        content += `
            <tr>
                <td>${count}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNguoiDung('${user.id}')">Xóa</button>
                    <button id="btnXem" class="btn btn-primary" onclick="xemNguoiDung('${user.id}')"data-toggle ="modal" data-target="#myModal">Xem</button>
                </td>
            </tr>
        `
        count++;
    })
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}


function themNguoiDung(mangND) {
    var isValid = true;
    isValid &= validation.checkEmpty(taiKhoan.value, 'spanTk', 'Tài khoản không được để trống') && validation.checkTaiKhoan(taiKhoan.value, 'spanTk', 'Tài khoản đã tồn tại', mangND);

    isValid &= validation.checkEmpty(hoTen.value, 'spanHoTen', 'Họ tên không được để trống') && validation.checkName(hoTen.value, 'spanHoTen', 'không chứa số và ký tự đặc biệt');
    
    isValid &= validation.checkEmpty(matKhau.value, 'spanMatKhau', 'Mật khẩu không được để trống') && validation.checkPass(matKhau.value, 'spanMatKhau', 'Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8');

    isValid &= validation.checkEmpty(email.value, 'spanEmail', 'Email không được để trống') && validation.checkEmail(email.value, 'spanEmail', 'Email phải đúng định dạng');

    isValid &= validation.checkEmpty(hinhAnh.value, 'spanHinhAnh', 'Hình ảnh không được để trống');
    isValid &= validation.checkSelect('loaiNguoiDung', 'spanLoaiND', 'Phải chọn loại người dùng');
    isValid &= validation.checkSelect('loaiNgonNgu', 'spanloaiNN', 'Phải chọn loại ngôn ngữ');
    isValid &= validation.checkEmpty(moTa.value, 'spanMota', 'Mô tả không được để trống') && validation.checkTextArea('MoTa', 'spanMota', 'Mô tả không được vượt quá 60 kí tự');
    if (isValid) {
        var nguoiDung = new NguoiDung(taiKhoan.value, hoTen.value, matKhau.value, email.value, hinhAnh.value, loaiND.value, ngonNgu.value, moTa.value);
        ndSerVices.themNguoiDung(nguoiDung)
            .then(function (result) {
                layDSND();
                document.querySelector('.modal-header .close').click();
                resetForm();
            })
            .catch(function (err) {
                console.log(err);
            })

    }
}
document.querySelector('.modal-header .close').onclick = function () {
    document.querySelectorAll('.invalid-feedback').forEach(function (item) {
        item.style.display = 'none';
    });
}
function xoaNguoiDung(id) {
    ndSerVices.xoaNguoiDung(id)
        .then(function (result) {
            layDSND();
        })
        .catch(function (err) {
            console.log(err);
        })
}

function xemNguoiDung(id) {
    ndSerVices.layChiTiet(id)
        .then(function (result) {
            getEle('TaiKhoan').disabled = true;
            document.querySelector('.modal-title').innerHTML = 'Cập nhật người dùng';
            document.querySelector('.modal-footer').innerHTML = ` <button id="btn-them" class="btn btn-success" onclick="capNhatNguoiDung('${result.data.id}')" >Cập nhật</button>`
            getEle('TaiKhoan').value = result.data.taiKhoan;
            getEle('HoTen').value = result.data.hoTen;
            getEle('MatKhau').value = result.data.matKhau;
            getEle('Email').value = result.data.email;
            getEle('HinhAnh').value = result.data.hinhAnh;
            getEle('loaiNguoiDung').value = result.data.loaiND;
            getEle('loaiNgonNgu').value = result.data.ngonNgu;
            getEle('MoTa').value = result.data.moTa;
            document.querySelectorAll('.invalid-feedback').forEach(function (item) {
                item.style.display = 'none';
            });
        })
        .catch(function (err) {
            console.log(err);
        })
}

function capNhatNguoiDung(id) {
    var isValid = true;
    isValid &= validation.checkEmpty(taiKhoan.value, 'spanTk', 'Tài khoản không được để trống');

    isValid &= validation.checkEmpty(hoTen.value, 'spanHoTen', 'Họ tên không được để trống') && validation.checkName(hoTen.value, 'spanHoTen', 'không chứa số và ký tự đặc biệt');

    isValid &= validation.checkEmpty(matKhau.value, 'spanMatKhau', 'Mật khẩu không được để trống') && validation.checkPass(matKhau.value, 'spanMatKhau', 'Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8');

    isValid &= validation.checkEmpty(email.value, 'spanEmail', 'Email không được để trống') && validation.checkEmail(email.value, 'spanEmail', 'Email phải đúng định dạng');

    isValid &= validation.checkEmpty(hinhAnh.value, 'spanHinhAnh', 'Hình ảnh không được để trống');

    isValid &= validation.checkSelect('loaiNguoiDung', 'spanLoaiND', 'Phải chọn loại người dùng');

    isValid &= validation.checkSelect('loaiNgonNgu', 'spanloaiNN', 'Phải chọn loại ngôn ngữ');

    isValid &= validation.checkEmpty(moTa.value, 'spanMota', 'Mô tả không được để trống') && validation.checkTextArea('MoTa', 'spanMota', 'Mô tả không được vượt quá 60 kí tự');

    if (isValid) {
        var nguoiDung = new NguoiDung(taiKhoan.value, hoTen.value, matKhau.value, email.value, hinhAnh.value, loaiND.value, ngonNgu.value, moTa.value);
        ndSerVices.capNhatNguoiDung(id, nguoiDung)
            .then(function (result) {
                layDSND();
                document.querySelector('.modal-header .close').click();
                resetForm();
            })
            .catch(function (err) {
                console.log(error);
            })
    }
}
function resetForm() {
    getEle('form').reset();
}
