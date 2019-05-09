const Logout = ( function() {


    return {
      logout: logout
      localStorage.clear();
      const urlstr = window.location.href + "/";
      window.location.replace(urlstr);
    }
  
} )();

  export default Logout;
