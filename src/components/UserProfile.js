const UserProfile = ( function() {
    let full_name = "";
    let email = "";
    let user_id = -1;
    let adminFlag = false;
  
    const getName = function() {
      
      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('full_name');
        if (temp != null) {
          full_name = temp; 
        }
      }

      return full_name;    // Or pull this from cookie/localStorage
    };
  
    const setName = function(name) {
      if (name!==null) {
        full_name = name;     
        // Also set this in cookie/localStorage
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('full_name', full_name);
        }
      }
    };

    const getEmail= function() {
      
      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('email');
        if (temp != null) {
          email = temp; 
        }
      }

      return email;    // Or pull this from cookie/localStorage
    };
  
    const setEmail = function(em) {
      if (em!==null) {
        email = em;     
        // Also set this in cookie/localStorage
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('email', email);
        }
      }
    };
  
    const getUserId = function() {
      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('user_id');
        if (temp != null) {
          user_id = temp; //playerA or playerB
        }
      }
        return user_id;    // Or pull this from cookie/localStorage
    };
    
    const setUserId = function(id) {
        user_id = id;     
        // Also set this in cookie/localStorage
        //console.log(user_id);
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('user_id', user_id);
        }
    };

    const isAdmin = function() {
      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('adminFlag');
        if (temp != null ) {
          if (temp==="true" || temp === true) {
            adminFlag = true;
          } else {
            adminFlag = false;
          }
        }
      }
        return adminFlag;    // Or pull this from cookie/localStorage
    };
    
    const setAdmin = function(ad) {
        adminFlag = ad;     
        // Also set this in cookie/localStorage
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('adminFlag', adminFlag);
        }
    };

    return {
      getUserId: getUserId,
      setUserId: setUserId,
      getName: getName,
      setName: setName,
      getEmail: getEmail,
      setEmail: setEmail,
      isAdmin: isAdmin,
      setAdmin: setAdmin
    }
  
} )();
  
  export default UserProfile;