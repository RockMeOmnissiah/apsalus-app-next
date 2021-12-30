module.exports = {

  Guard_ReactSailsAPIErrors: async function (router, response) {

    if (response.status != 200) {

      if(response.status == 400) {
        const rData = JSON.parse(await response.text());
        const errorQuery = ('?errorCode=' + rData.code + '&errorMsg=' + rData.problems);
        router.push('/400' + errorQuery);

      } else if (response.status == 401) {
        const errorQuery = ('?referer=' + router.asPath);
        router.push('/401' + errorQuery);

      } else {
        router.push('/' + response.status);
      }
      return false;
    }

    return true;
  }
};
