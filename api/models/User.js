var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


//User Schema
var UserSchema = new mongoose.Schema ({
	firstName: 		String,
	lastName: 		String,
	email: 			String, 
	password: 		String,
	googleId: 		String,
	facebookId: 	String,
	displayName: 	String
});


//Create a new method to remove password from json string ie Hide from dev tools
UserSchema.methods.toJSON = function(){
	var user = this.toObject();
	delete user.password;
	return user;
}

UserSchema.methods.comparePasswords = function(password, callback){
	bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')){
		return next();	
	} 

	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){
				return next(err);
			}
			 user.password = hash;
			 next();
		});
	});
});

module.exports = exports = userModel = mongoose.model('User', UserSchema);
