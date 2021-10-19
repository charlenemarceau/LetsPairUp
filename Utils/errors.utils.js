module.exports.registerErrors = (err) => {
    // declare  empty object error
    let errors =  {
        username: '',
        email: '',
        password: ''}
    //based on error various errors messages
    if (err.message.includes('username')) {
        errors.username = "Ce pseudo est incorrect ou déjà pris";
    }
    if (err.message.includes('email')) {
        errors.email = "Cet email est incorrect";
    }
    if (err.message.includes('password')) {
        errors.password = "Le mot de passe doit contenir minimum 6 caractères";
    } 
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
    errors.username = "Ce pseudo est déjà utilisé";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà utilisé";

    return errors;
}

module.exports.logInErrors = (err) => {
    let errors = { 
        email: '',
        password: ''
    }
    if (err.message.includes("email")) 
      errors.email = "Cet email est incorrect";
    if (err.message.includes('password'))
      errors.password = "Le mot de passe est incorrect"
    return errors;
  }


module.exports.uploadErrors = (err) => {
    let errors = { format : '', maxSize: ""};

    if (err.message.includes('invalid file')) {
        errors.format = "Format incompatible";
    }
    if (err.message.includes('max size')) {
        errors.maxSize = "Le fichier dépasse 500ko";
    }
    return errors;
}