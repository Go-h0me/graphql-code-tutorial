const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

/*
query -> users -> favoriteMovies -> another level
*/

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      // console.log(context.req.headers);
      // console.log(info);
      // return UserList
      if (UserList) return { users: UserList };
      return {message:"There was an error"}
    },

    user: (parent, args, context, info) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    //MOVIE RESOVELS
    movies: () => {
      return MovieList;
    },

    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },

  User: {
    favoriteMovies: (parent) => {
      console.log(parent);
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      // console.log(user); se tra kw ve teminal
      const lastId = UserList[UserList.length - 1].id;

      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      // const id= args.input.id
      // const newUsername = args.input.newUsername
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },

  
  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return "UsersSuccessfulResult"
      }
      if (obj.message){
        return "UsersErrorResult";

      };

      return null
    },
  },
};

module.exports = { resolvers };
