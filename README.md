# Authentication 🔐
<h2>Introduction:</h2>
<p>This application is solely based to understand the principles of Authentication and security 
and explaining all the levels of security starting from Caesar Cipher to Oauth2.0</p>
<hr>
<h2>Technologies:</h2>
<ul>
  <h3><li>Oauth 2.0 </li></h3>
  <h3><li>NPM Packages:<ul>
                        <h4><li>passport</li></h4>
                        <h4><li>passport-facebook</li></h4>
                        <h4><li>passport-google-oauth20</li></h4>
                        <h4><li>passport-local</li></h4>
                        <h4><li>passport-local-mongoose</li></h4>
                        <h4><li>bcrypt</li></h4>
                        <h4><li>md5</li></h4>
                        <h4><li>mongoose-encryption</li></h4>
                        <h4><li>dotenv</li></h4>
                        </ul>
        </li>
       <h3><li>GIT Version Control</li></h3>
       <h3><li>Node</li></h3>
       <h3><li>Express</li></h3>
       <h3><li>ejs</li></h3>
       </ul>
       <hr>
<h2>Table of Content:</h2>
<ul>
  <h3><li>Commit 1:</h3>
  <em>Commit Link =</em>https://github.com/Raxy45/Security/commit/6bf6a0830abf1dc08e1806f72edd023f1773da40
  <p>In this commit the basic checking of the password is done using the if statement</p>
  <h3><li>Commit 2:</h3>
  <em>Commit Link =</em>https://github.com/Raxy45/Security/commit/12bd9a8bccbb1b007811749863080ef6d586048f
  <p>The <em>mongoose-encryption</em> package is used.This package encrypts the entire data while saving in Database
  and when model.findOne() is used it automatically decrypts the data in order to match the query.</p>
  <h3><li>Commit 3:</h3>
  <em>Commit Link =</em>https://github.com/Raxy45/Security/commit/a00d61ff4b1dc03e8ddac16adb2aa4e04f3f7179
  <p>The code is same as commit 2 except the fact that the Secret Key is used using a <em>dotenv</em> package.</p>
  <h3><li>Commit 4:</h3>
  <em>Commit Link =</em>https://github.com/Raxy45/Security/commit/34036674a847c130a4808f47a21bb4bfcbdd9df7
  <p>In order to eliminate the need of the Secret Key , the <em>md5</em> package is used. This package
  hashes the password while saving in Database and as it is almost impossible to recover password from hash,In .findOne() we again check the
  password by first hashing and then comparing it to the one in Database</p>
  <h3><li>Commit 5:</h3>
  <em>Commit Link =</em>https://github.com/Raxy45/Security/commit/a4faf9a640aef093f3b6191e6c8ab4839256a565
  <p>In this scenario , the <em>bcrypt</em> package is used and salt rounds are added so that the password becomes more immune</p>
  <h3><li>Commit 6:</li></h3>
  <em>Commit Link=</em>https://github.com/Raxy45/Security/commit/d45e63ae046d51c772c7f0ac27932ac1fd640651
  <p>The packages <em>passport,passport-local,passport-local-mongoose</em> are added and all the the heavy weight lifting 
  of salting and hashing part,etc is taken care by Passport !. The <em>express-session</em> package creates a cookie and a session created until
  the user logs out,Once logged out the cokkie is destroyed.</p>
  <h3><li>Commit 7:</li></h3>
  <em>Commit Link:</em>https://github.com/Raxy45/Security/commit/25bf0e6950b085d6e7b90d07172728233f325587
  <p>The <strong>OAuth 2.0</strong> technology is used in ths case and the particularly the <em>passport-google-oauth-2.0</em> package is used
  and the authentication is done using "Google Strategy"</p>
  <h3><li>Commit 8:</li></h3>
  <em>Commit Link:</em>https://github.com/Raxy45/Security/commit/c110cf6f8d2db27cc704de32639b88f6388f9a5f
  <p>Using <strong>OAuth 2.0</strong> technology, this time the "Facebook Strategy" is implemented using the <em>passport-facebook</em>
  package</p>
</ul>
<hr>
<h2>Project Status:</h2>
The project is implemented solely for learning Authentication and Security and is up to mark.
  
 
                        
