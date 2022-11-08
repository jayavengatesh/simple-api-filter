const express = require('express');
const app = express();
const axios = require('axios');
const bodyparser = require('body-parser')


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



app.get('/', async (req, res) => {
  const { email, password } = req.body;

  if (email == "cryon@gmail.com" && password == "admin") {

    const response = await axios.get("https://randomuser.me/api/?results=10");
    const arr = response.data.results

    //counts
    let count = 0
    let count2 = 0
    let count3 = 0
    let agecount = 0
    let Emails = []


    arr.forEach(ele => {

      //finding male and female count

      if (ele.gender == "male") {
        count++
      }
      if (ele.gender == "female") {
        count2++
      }
      if (ele.gender == "other") {
        count3++
      }

      //finding age count
      if (ele.dob.age > 50 && ele.dob.age < 70) {
        agecount++
      }

      let string = ele.email;
      let sliceder = string.split("@");
      let newText = sliceder[0].replace(".", " ");
      //for mail
      Emails.push(`MR.${newText} | ${string}`);
    })

    //returning all response

    return res.json({
      "Total Number of Males Users": count,
      "Total Number of Females Users": count2,
      " Other Users": count3,
      "Age count between 50 to 70 is ": agecount,
      "Emails are": Emails
    })

  } else {
   res.status(401).send("failed to login! username and password does not match")
  }
})


app.listen(4000, () => console.log("service starting at 4000"))