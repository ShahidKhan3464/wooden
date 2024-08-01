import Swal from 'sweetalert2';

const sweetalert = (message = 'Error occured', icon = null, routeFun = null) => {
    return (
        Swal.fire({
            icon: icon,
            text: message,
            // timer: 2000,
            // timerProgressBar: true,
            // showConfirmButton: false,
            confirmButtonColor: '#06bf97',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.value) {
                if (routeFun !== null) {
                    routeFun();
                }
            }
        })
    );
};

export default sweetalert;