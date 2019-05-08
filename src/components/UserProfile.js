const UserProfile = ( function() {
    let full_name = "";
    let user_id = -1;
    let adminFlag = false;
  
    const getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    const setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };
  
    const getUserId = function() {
        return user_id;    // Or pull this from cookie/localStorage
    };
    
    const setUserId = function(id) {
        user_id = id;     
        // Also set this in cookie/localStorage
    };

    const isAdmin = function() {
        return adminFlag;    // Or pull this from cookie/localStorage
    };
    
    const setAdmin = function(ad) {
        adminFlag = ad;     
        // Also set this in cookie/localStorage
    };

    return {
      getUserId: getUserId,
      setUserId: setUserId,
      getName: getName,
      setName: setName,
      isAdmin: isAdmin,
      setAdmin: setAdmin
    }
  
} )();
  
  export default UserProfile;