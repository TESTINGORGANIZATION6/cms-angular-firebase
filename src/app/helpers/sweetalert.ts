import Swal from 'sweetalert2';

export function simpleAlert(alerttitle, alertMsg, alertIcon){

    Swal.fire({
        title: alerttitle,
        text: alertMsg,
        icon: alertIcon,
        // showCancelButton: true,
        // confirmButtonText: 'Yes, delete it!',
        // cancelButtonText: 'No, keep it'
      }).then((result) => {
           
        // else if (result.dismiss === Swal.DismissReason.cancel) {
        //   Swal.fire(
        //     'Cancelled',
        //     'Your imaginary file is safe :)',
        //     'error'
        //   )
        // }
      })  
}