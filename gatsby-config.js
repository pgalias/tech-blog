/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url:
          "https://content-eu-4.content-cms.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/search?q=text:(**)&fl=document:[json]&fq=libraryId:(d7094af2\-8966\-40db\-8803\-c83d663810f8)",
      },
    },
  ],
};

