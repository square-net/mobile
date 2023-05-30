import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['String'];
  followerId: Scalars['Int'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  likedPostId: Scalars['String'];
  userId: Scalars['Int'];
};

export type MediaItem = {
  __typename?: 'MediaItem';
  alt: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  post: Post;
  src: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authSendVerificationEmail: UserResponse;
  changePassword: UserResponse;
  changeUsername: UserResponse;
  createPost: PostResponse;
  deletePost: Scalars['Boolean'];
  editEmailAddress: UserResponse;
  editProfile: UserResponse;
  followUser?: Maybe<Follow>;
  likePost?: Maybe<Like>;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  notAuthModifyPassword: UserResponse;
  removeLike: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  sendRecoveryEmail: UserResponse;
  signup?: Maybe<UserResponse>;
  unfollowUser: Scalars['Boolean'];
  updateGender: UserResponse;
  updatePost: PostResponse;
  verifyEmailAddress: UserResponse;
  viewNotifications?: Maybe<Scalars['Boolean']>;
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangeUsernameArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
  images: Scalars['String'];
  state: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationEditEmailAddressArgs = {
  confirmEmail: Scalars['String'];
  email: Scalars['String'];
};


export type MutationEditProfileArgs = {
  bio: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  profileBanner: Scalars['String'];
  profilePicture: Scalars['String'];
  website: Scalars['String'];
};


export type MutationFollowUserArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationLikePostArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  clientName: Scalars['String'];
  clientOS: Scalars['String'];
  deviceLocation: Scalars['String'];
  input: Scalars['String'];
  password: Scalars['String'];
};


export type MutationNotAuthModifyPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRemoveLikeArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars['Float'];
};


export type MutationSendRecoveryEmailArgs = {
  email: Scalars['String'];
};


export type MutationSignupArgs = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateGenderArgs = {
  gender?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePostArgs = {
  content: Scalars['String'];
  deletedImages: Scalars['String'];
  images: Scalars['String'];
  postId: Scalars['String'];
  state: Scalars['String'];
  type: Scalars['String'];
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  id: Scalars['Int'];
  notificationId: Scalars['String'];
  recipientId: Scalars['Float'];
  resourceId: Scalars['Float'];
  type: Scalars['String'];
  viewed: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Float'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  hashtags?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  media?: Maybe<Array<MediaItem>>;
  mentions?: Maybe<Array<Scalars['String']>>;
  postId: Scalars['String'];
  state: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
  status?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  profileBanner?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findPost?: Maybe<Post>;
  findPostById?: Maybe<Post>;
  findUser?: Maybe<User>;
  findUserById?: Maybe<User>;
  follows?: Maybe<Array<Follow>>;
  getFollowers?: Maybe<Array<User>>;
  getFollowing?: Maybe<Array<User>>;
  getLikedPosts?: Maybe<Array<Post>>;
  getPostLikes?: Maybe<Array<User>>;
  isFollowedByMe: Scalars['Boolean'];
  isPostLikedByMe: Scalars['Boolean'];
  isUserFollowingMe: Scalars['Boolean'];
  me?: Maybe<User>;
  notificationFeed: Array<Notification>;
  postFeed: Array<Post>;
  postImages: Array<MediaItem>;
  relevantPeople: Array<User>;
  search: SearchResult;
  unseenNotifications: Array<Notification>;
  userPostFeed: Array<Post>;
};


export type QueryFindPostArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryFindPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryFindUserArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetFollowersArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetFollowingArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetLikedPostsArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPostLikesArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryIsFollowedByMeArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryIsPostLikedByMeArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryIsUserFollowingMeArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryPostImagesArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryRelevantPeopleArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QuerySearchArgs = {
  keyword?: InputMaybe<Scalars['String']>;
};


export type QueryUserPostFeedArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  posts?: Maybe<Array<Post>>;
  users?: Maybe<Array<User>>;
};

export type Session = {
  __typename?: 'Session';
  clientName: Scalars['String'];
  clientOS: Scalars['String'];
  creationDate: Scalars['String'];
  deviceLocation: Scalars['String'];
  id: Scalars['Int'];
  sessionId: Scalars['String'];
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  deletedNotification: Notification;
  newNotification: Notification;
};


export type SubscriptionDeletedNotificationArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};


export type SubscriptionNewNotificationArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  birthDate: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  profile?: Maybe<Profile>;
  sessions?: Maybe<Array<Session>>;
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, firstName: string, lastName: string, email: string, birthDate: string, gender: string, emailVerified: boolean, profile?: { __typename?: 'Profile', profilePicture?: string | null | undefined, profileBanner?: string | null | undefined, bio?: string | null | undefined, website?: string | null | undefined } | null | undefined, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientName: string, deviceLocation: string, creationDate: string }> | null | undefined, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, type: string, content: string, state: string, createdAt: string, updatedAt: string, mentions?: Array<string> | null | undefined, hashtags?: Array<string> | null | undefined, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null | undefined }> | null | undefined } | null | undefined };


export const MeDocument = gql`
    query Me {
  me {
    id
    username
    firstName
    lastName
    email
    birthDate
    gender
    emailVerified
    profile {
      profilePicture
      profileBanner
      bio
      website
    }
    sessions {
      id
      sessionId
      clientOS
      clientName
      deviceLocation
      creationDate
    }
    posts {
      id
      postId
      authorId
      type
      content
      state
      createdAt
      updatedAt
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;