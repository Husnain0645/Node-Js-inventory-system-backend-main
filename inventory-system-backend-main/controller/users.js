const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var fs = require("fs");

const Role = require("../models/Role");
// const Cnic = require("../models/Cnic");
// const Ride = require("../models/Ride");
// const Car = require("../models/Car");

// const reviews = require("../models/reviews");

/////////////Login Sign Up 
exports.register = async function (req, res) {
  try {
    var { name, email, mobile, password, gender, roleId, city, country } = req.body;
    // console.log(name, email, mobile, password);
    const alreadyExistsUser = await User.findOne({ where: { email } });

    if (alreadyExistsUser) {
      return res
        .status(409)
        .json({ message: "User with email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      city,
      country,
      roleId
      // profilePic: req.file.filename,
    });
    res.status(201).json({
      status: "success",
      message: "registeration successful",
    });

    // .catch((err) => res.send(err));
    //  user.addRole(role)
    // res.json({ message: "Thanks for registering" });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

///////////////////////////////////////////////////.../LOGIN/.../////////////////////////////////////
exports.login = async function (req, res) {
    const { email , password } = req.body;

    var userWithEmail = await User.findOne({
      where: { email },
      include: {
        model: Role,
      },
    }).catch((err) => {
      console.log("Error: ", err);
    });

    const token = jwt.sign(
      {
        id: userWithEmail.id,
        email: userWithEmail.email,
        name: userWithEmail.name,
      },
      process.env.KEY,
      {
        expiresIn: 86400,
      }
    );
    res.cookie("token", token);
    res.header("token", token);
    if (userWithEmail) {
  
      let submittedPass = password; 
      let storedPass = userWithEmail.password; 

      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
      if (passwordMatch) {
          res.cookie("token",token)
            res.json({ message: "Welcome Back!", token: token });
      } else {
          res.send('email or password is incoreect');
      }
  }
  else {

      let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
      await bcrypt.compare(req.body.password, fakePass);

      res.send('email or password is incoreect');
  }
   // res.cookie("jwt", token);
    

    
    // res.status(200).json({
    //   status: "success",
    //   message: "Welcome " + userWithEmail.name,
    //   accessToken: token,
    // });

    // res.status(200).json({ success: true, token });
  } ;


exports.logout = async function (req, res) {
  try {
    res.clearCookie("jwt");
    res.redirect("login");
  } catch (error) {
    res.send(error);
  }
};

///////////////////////////////////////////profile edit/////////////////////////////////////////

///////Get all Users 
exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll({where :{ Active : true }, attributes : {exclude : ["Active"]}
})
  .catch((err)=>{
    res.status(204).json({
      Error : err.message,
    });
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
};

///////////Get all User By ID  
exports.GetUserById = async (req, res) => {
   await User.findAll({where : {id : req.params.id}})
    .then (lists => {
        res.status(200).send(lists);
    })
    .catch(err => console.log(err));
    
  };
////////////////////////////////////////////upload and update profile picture///////////////////
//Update User 
exports.Updateuser = async (req , res)=> {

  const {name , email , password , mobile  , city , country , roleId } = req.body;
  await User.update({name,city,email,password,mobile, country , roleId
          },{ where: { id: req.user.id } }).then(()=>{
    res.status(201).json({
      message : "successfully updated  "
    })
  }).catch((err)=>{
    res.status(400).json({
      error : err.message
    })
  })

}
//Delete User 
exports.deleteMe = async (req, res, next) => {
  // const finduser = await User.update({where :{ id : req.user.id}})
  await User.update({Active : false },{ where: { id: req.user.id } }).then(()=>{
res.status(201).json({
message : "successfully updated  "
})
}).catch((err)=>{
res.status(400).json({
error : err.message
})
})
};






///////////////

exports.update_profilePic = async function (req, res) {
  // res.send("hello");
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });

  if (user.imagepath == null || user.imagepath <= 0) {
    await User.update(
      {
        profilePic: req.file.filename,
        imagepath: req.file.path,
      },
      { where: { id: req.user.id } }
    )
      .then(res.status(200).json("image updated"))
      .catch((err) => res.send(err));
  } else {
    const oldPath = user.imagepath;
    if (fs.existsSync(oldPath)) {
      fs.unlink(oldPath, async (err) => {
        if (err) {
          res.send(err);
        }
      });
      await User.update(
        {
          profilePic: req.file.filename,
          imagepath: req.file.path,
        },
        { where: { id: req.user.id } }
      )
        .then(res.status(200).json("image updated"))
        .catch((err) => res.send(err));
    }
  }
};

//////////////////////////////////////////CNIC ADD////////////////////////////////////////////////
exports.update_profile = async function (req, res) {
  var { city, country, gender, email } = req.body;
  console.log(req.body);
  console.log(req.user.email);
  const emailfind = await User.findOne({ where: { email: req.user.email } });

  if (emailfind || emailfind === null) {
    await User.update(
      {
        city,
        country,
        gender,
        email,
      },
      { where: { id: req.user.id } }
    )
      .then(res.status(200).json("profile updated"))
      .catch((err) => {
        console.log(err.message);
        res.send(err);
      });
  } else {
    res.status(401).json("Email already exists");
  }
};
// exports.Cnic_register = async function (req, res) {
//   // var tempimg = [];
//   // console.log(req.files);
//   // for (const file of req.files) {
//   //   tempimg.push(file.filename);
//   // }
//   const cnic = await Cnic.findOne({
//     where: { userId: req.user.id },
//     include: [{ model: User }],
//   });
//   if (!cnic) {
//     const cnicImage = await Cnic.create({
//       // front_img: tempimg[0],
//       front_img: req.file.filename,
//       imagepath: req.file.path,
//       // back_img: tempimg[1],
//       userId: req.user.id,
//     })
//       .then(res.status(200).json({ message: "Thanks for adding CNIC" }))
//       .catch((err) => res.send(err));
//   } else {
//     const oldPath = cnic.imagepath;
//     if (fs.existsSync(oldPath)) {
//       fs.unlink(oldPath, async (err) => {
//         if (err) {
//           res.send(err);
//         }
//       });
//       await Cnic.update(
//         {
//           front_img: req.file.filename,
//           imagepath: req.file.path,
//         },
//         { where: { userId: req.user.id } }
//       )
//         .then(res.status(200).json("Cnic updated"))
//         .catch((err) => res.send(err));
//     }
//   }
// };

////////////////////////////////////////profile view///////////////////////////////////////////////
// exports.profile = async function (req, res) {
//   try {
//     const user = await User.findOne({
//       where: { id: req.user.id },

//       attributes: { exclude: ["password"] },
//     })
//       .then((user) => {
//         return res.send(user);
//       })
//       .catch((error) => {
//         console.log(error);
//         res.send(error);
//       });
//   } catch (error) {
//     console.log(error);
//     return res.send(error);
//   }
// };

// exports.updateInfo = async (req, res, next) => {
//   try {
//     const { name, city, email } = req.body;

//     console.log(req.body);
//     const user = await User.update(
//       {
//         name,
//         city,
//         email,
//       },

//       { where: { id: req.user.id } }
//     );
//     return res.status(200).json({
//       status: "success",
//       message: "Information updated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error.message);
//   }
// };
//////////////////////////////////////create ride/////////////////////////////////////
exports.createRide = async (req, res, next) => {
  console.log("Hello");
  try {
    const car = await Car.findOne({
      where: { userId: req.user.id },
    });
    console.log(req.body);
    const {
      from,
      fromAddress,
      to,
      toAddress,
      date,
      time,
      fare,
      notes,

      seats,
      type,
      width,
      height,
      weight,
      parcelFare,
      parcelComment,
      trunk,
    } = req.body;
    const userId = req.user.id;
    if (car) {
      const ride = await Ride.create({
        from,
        fromAddress,
        to,
        toAddress,
        date,
        seats,
        time,
        fare,
        notes,
        userId,
        type,
        width,
        height,
        weight,
        parcelFare,
        parcelComment,
        trunk,
        regNo: car.regNo,
        make: car.make,
        model: car.model,
        registrationYear: car.registrationYear,
        color: car.color,
      });

      // const rideId = ride.id;

      return res.status(200).json({
        status: "success",
        message: "Ride created successfully",
      });
    } else {
      return res.status(400).json("no car registered");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
};
/////////////////////////////////////////create car////////////////////////////////////////////
exports.createCar = async (req, res, next) => {
  var { regNo, make, model, registrationYear, color } = req.body;
  const car = await Car.create({
    regNo,
    make,
    model,
    registrationYear,
    color,
    userId: req.user.id,
  });
  return res.status(200).json({
    status: "success",
    message: "Car created successfully",
  });
};
/////////////////////////////////////////mycar////////////////////////////////////////////
exports.myCar = async (req, res, next) => {
  const car = await Car.findOne({
    where: { userId: req.user.id },
  });

  return res.status(200).json(car);
};
/////////////////////////////////////////update car////////////////////////////////////////////
exports.updateCar = async (req, res, next) => {
  var { regNo, make, model, registrationYear, color } = req.body;
  const car = await Car.update(
    {
      regNo,
      make,
      model,
      registrationYear,
      color,
    },
    { where: { userId: req.user.id } }
  );
  return res.status(200).json({
    status: "success",
    message: "Car updated successfully",
  });
};

/////////////////////////////////////////////reviews by driver//////////////////////////////////////

exports.review_by_service_provider = async function (req, res) {
  //found job now update it
  try {
    console.log(req.body);
    var review = await reviews.create({
      review: req.body.review,
      stars: req.body.stars,
      rideId: req.body.rideId,
      receiverId: req.body.userId,
      userId: req.user.id,
    });
    res.json("review submitted");
  } catch (error) {
    res.send(error);
  }
};


// /////////////////////////////////////review by User//////////////////////////////////
// exports.review_by_user = async function (req, res) {
//   try {
//     var review = await reviews
//       .create({
//         review: req.body.review,
//         stars: req.body.stars,
//         rideId: req.body.rideId,
//         receiverId: req.body.userId,
//         userId: req.user.id,
//       })
//       .then(res.send("Review Submitted"))
//       .catch((err) => {
//         res.send(err);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

////////////////////////////////////////all reviews  update for customer//////////////////////////////////////
// exports.review_by_service_provider = async function (req, res) {
//   var job = await Ride.findOne({
//     where: { id: req.params.id },
//   }).catch((err) => res.send(err));

//   var review = await reviews
//     .update(
//       {
//         review_by_service_provider: req.body.review,
//         stars_by_service_provider: req.body.stars,
//       },
//       { where: { Ride: job.id } }
//     )
//     .then(res.send("Review Submitted"))
//     .catch((err) => res.send(err));
// };

////////////////////////////////////////////find all reviews for display on dashboard of user//////////////////////////

exports.allreviewsfordashboard = async function (req, res) {
  var review = await reviews
    .findAll({
      include: [
        {
          all: true,
        },
      ],
      where: { receiverId: req.user.id },
    })
    .catch((err) => res.send(err));

  res.json(review);
};
