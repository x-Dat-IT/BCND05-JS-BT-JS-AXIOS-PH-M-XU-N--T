function NguoiDungServices() {
    this.layDS = function () {
        return axios({
            method: 'get',
            url: 'https://61dffe810f3bdb0017934ce0.mockapi.io/Users',
        })
    }
    this.themNguoiDung = function (nguoiDung) {
        return axios({
            method: 'post',
            url: 'https://61dffe810f3bdb0017934ce0.mockapi.io/Users',
            data: nguoiDung,
        });
    }
    this.xoaNguoiDung = function (id) {
        return axios({
            method: 'delete',
            url: `https://61dffe810f3bdb0017934ce0.mockapi.io/Users/${id}`,

        });
    }
    this.layChiTiet = function (id) {
        return axios({
            method: 'get',
            url: `https://61dffe810f3bdb0017934ce0.mockapi.io/Users/${id}`,

        });
    }
    this.capNhatNguoiDung = function (id,nguoiDung) {
        return axios({
            method: 'put',
            url: `https://61dffe810f3bdb0017934ce0.mockapi.io/Users/${id}`,
            data: nguoiDung,
        });
    }

}