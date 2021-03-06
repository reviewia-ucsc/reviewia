import {
  Grid,
  ListItemText,
  makeStyles,
  Typography,
  List,
  Link as MuiLink,
  ListItem,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import HeadImage from "../static/img/homepage_head.svg";
import SearchIcon from "@material-ui/icons/Search";
import Footer from "../components/Footer";
import Phone from "../static/img/j7.jpg";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AppleStore from "../static/img/getAppleStore.svg";
import PlayStore from "../static/img/getPlayStore.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getRecentPosts } from "../services/posts";
import { CatContext } from "../context/CategorySubCategotyContext";
import { getDate } from "../utils/dateTime";
import NotFoundImage from "../assets/not-found.svg";
import { PreLoader } from "../components/basic/PreLoader";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { getPostBySearch } from "../services/posts";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  headSection: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(5),
  },
  headHeader: {
    fontWeight: "400 !important",
    fontSize: 50,
  },
  headSubHeader: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
        2
      )}px ${theme.spacing(3)}px`,
    },
  },
  headImage: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      marginTop: 150,
      zIndex: -100,
      opacity: 0.3,
      justifyContent: "center",
      "& img": {
        width: "100%",
        height: "100%",
      },
    },
  },
  headSearchInput: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
  },
  trendingSection: {
    marginBottom: 50,
  },
  list: {
    textAlign: "left",
  },

  PopularCategoryLink: {
    border: "none",
    width: "100%",
    textDecoration: "none",
    textAlign: "left",
    paddingLeft: 30,
    cursor: "pointer",
    "&.MuiLink-button": {
      textAlign: "left",
      paddingLeft: theme.spacing(2),
    },
  },
  mostRecentCard: {
    cursor: "pointer",
    "& .MuiCardHeader-title": {
      fontSize: 16,
    },
    "& .MuiCardHeader-subheader": {
      fontSize: 12,
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxClassName: {
    width: "100%",
    margin: 0,
  },
  divClassName: {
    padding: theme.spacing(1),
  },
  getAppImageSection: {
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      opacity: 0.3,
      "& img": {
        height: 150,
        zIndex: -5,
      },
    },
  },
  getOurAppImages: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: 150,
      height: 50,
      margin: 10,
      zIndex: 5,
    },
  },
  getAppPaperBox: {
    padding: `${theme.spacing(0)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`,
  },
  notFoundImage: {
    width: "100%",
    maxWidth: "150px",
  },
  homeSearch: {
    width: "100%"
  },
  productCardImage: {
    width: 40,
    height: 40,
    borderRadius: "50%"
  }
}));

const HomeSearch = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [dataSet, setDataSet] = useState([]);

  useEffect(async () => {
    if (search) {
      let res = await getPostBySearch({ title: search });
      console.log(res);
      if (res) {
        setDataSet(res["posts"]);
      }
    } else {
      if (dataSet !== []) {
        setDataSet([]);
      }
    }
  }, [search]);

  return (
    <>
      <Autocomplete
        freeSolo
        className={classes.homeSearch}
        id="free-solo-2-demo"
        disableClearable
        getOptionLabel={(option) => option.title}
        options={dataSet && dataSet}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Link
              to={`product/view/${option.postId}`}
              style={{
                display: "flex",
                alignItems: "center",
                color: "black",
                textDecoration: "none",
              }}
            >
              <div style={{ height: 30 }}>
                <img
                  src={`${option.imgURL[0].url}`}
                  style={{ maxWidth: 30, maxHeight: 30, marginRight: 16 }}
                />
              </div>
              <span>{option.title}</span>
            </Link>
          </React.Fragment>
        )}
        ListboxProps={{
          style: {
            overflowY: "scroll",
            maxHeight: 300,
          },
        }}
        renderInput={(params) => (
          <Controls.Input
            {...params}
            endAdornment={<SearchIcon />}
            fullWidth={true}
            size="medium"
            className={classes.headSearchInput}
            placeholder="What are you looking for..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Controls.Input>
        )}
      />
    </>
  );
};

const MostRecentCard = (props) => {
  const classes = useStyles();
  let { post } = props;

  return (
    <Grid item xs={6} sm={4} lg={3}>
      <Link
        to={`/product/view/${post.postId}`}
        style={{ textDecoration: "none" }}
      >
        <Controls.Card className={classes.mostRecentCard}>
          <CardHeader
            style={{ width: "100%", height: 80, textAlign: "left" }}
            title={post.title}
            avatar={post.avatarUrl ? (
              <img
                title={`${post.createdBy}`}
                alt=""
                src={`${post.avatarUrl}`}
                className={classes.productCardImage}
              />
            ) : (
              <Skeleton
                title={`${post.createdBy}`}
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            )}
            subheader={getDate(post.createdAt)}
          ></CardHeader>
          <CardMedia title={post.title}>
            <div style={{ width: 200, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                style={{ maxWidth: 200, maxHeight: 200 }}
                src={`${post.imgURL.length === 0 ? "" : post.imgURL[0].url}`}
              />
            </div>
          </CardMedia>
          <CardContent style={{ width: "100%" }} >
            <Rating
              name="phone"
              value={post.rate}
              precision={0.25}
              getLabelText={(val) => `${val} Heart${val !== 1 ? "s" : ""}`}
              readOnly
            />
            <Box>{post.rate}</Box>
          </CardContent>
        </Controls.Card>
      </Link>
    </Grid>
  );
};

const PopularcategorySection = (props) => {
  const classes = useStyles();
  const res = useContext(CatContext);
  const [popularCatList, setPopularCatList] = useState([]);
  const [popularCatListLoading, setPopularCatListLoading] = useState(true);

  function compare(a, b) {
    if (a.postCount > b.postCount) {
      return -1;
    }
    if (a.postCount < b.postCount) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (res) {
      let allCat = res.products.concat(res.services);
      allCat.sort(compare);
      if (allCat.length > 6) {
        allCat = allCat.slice(0, 6);
      }
      setPopularCatList(allCat);
      setPopularCatListLoading(false);
    }
  }, [res]);

  return (
    <Controls.Paper style={{ minHeight: "50vh", position: "relative" }}>
      {popularCatListLoading ? <PreLoader loading={true} /> : null}

      <Typography variant="h4" component="div">
        Popular Categories
      </Typography>

      <List className={classes.list}>
        {popularCatList && popularCatList.length !== 0 ? (
          popularCatList.map((category, index) => (
            <ListItem key={index}>
              <Controls.Paper
                boxClassName={classes.boxClassName}
                divClassName={classes.divClassName}
              >
                <Grid container justifyContent="flex-start">
                  <MuiLink
                    to={`/products/${category.categoryName}`}
                    className={classes.PopularCategoryLink}
                    underline="none"
                    component={Link}
                  >
                    <ListItemText
                      primary={category.categoryName}
                      secondary={`${category.postCount} posts`}
                      secondaryTypographyProps={{
                        style: { marginLeft: 30 },
                      }}
                    />
                    <ArrowForwardIcon
                      style={{ position: "absolute", top: 30, right: 30 }}
                    />
                  </MuiLink>
                </Grid>
              </Controls.Paper>
            </ListItem>
          ))
        ) : (
          <Grid
            container
            alignItems="center"
            style={{ marginTop: 20, flexDirection: "column" }}
          >
            {/* <Typography>
                Categories not found.
              </Typography> */}
            <img src={NotFoundImage} className={classes.notFoundImage} />
          </Grid>
        )}
      </List>
    </Controls.Paper>
  );
};

export default function HomePage(props) {
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const [updateListLoading, setUpdateListLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(async () => {
    if (userData) {
      let data = await getRecentPosts();
      if (data) {
        setRecentPosts(data);
      }
      setUpdateListLoading(false);
    }
  }, [userData]);

  return (
    <div>
      <Header userData={userData} setUserData={setUserData}></Header>
      {/* Start Head section */}
      <div>
        <Grid container className={classes.headSection}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={7}>
              <Typography
                variant="h2"
                component="div"
                className={classes.headHeader}
              >
                Reviewia is where your purchase confidence begins.
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={classes.headSubHeader}
              >
                You can choose the most suitable product or service of your liking based on authentic, timely reveiws and ratings from experienced users. Join the community of consumers and reviewers!
              </Typography>
              <Controls.Button to="/products" component={Link} color="primary">
                Start Reviewing <ArrowRightIcon />
              </Controls.Button>
            </Grid>
            <Grid item xs={12} md={6} lg={5} className={classes.headImage}>
              <img src={HeadImage} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <HomeSearch />
          </Grid>
        </Grid>
      </div>
      {/* End Head section */}

      {/* Start Trending section */}
      <Grid container className={classes.trendingSection}>
        {/* Start Popular categories */}
        <Grid item xs={12} md={4}>
          <PopularcategorySection />
        </Grid>
        {/* End Popular categories */}

        {/* Start Most view  */}
        <Grid item xs={12} md={8}>
          <Controls.Paper style={{ minHeight: "50vh", position: "relative" }}>
            {updateListLoading ? <PreLoader loading={true} /> : null}
            <Grid container spacing={2}>
              <Grid container justifyContent="center">
                <Typography variant="h4" component="div">
                  Most Recent Updates
                </Typography>
              </Grid>
              {recentPosts.length !== 0 ? (
                recentPosts.map((item, i) => (
                  <MostRecentCard key={i} post={item} />
                ))
              ) : (
                <Grid
                  container
                  alignItems="center"
                  style={{ marginTop: 20, flexDirection: "column" }}
                >
                  {/* <Typography>
                      Updates not found.
                    </Typography> */}
                  <img src={NotFoundImage} className={classes.notFoundImage} />
                </Grid>
              )}
            </Grid>
          </Controls.Paper>
        </Grid>
        {/* End Most view  */}
      </Grid>

      {/* End Trending section */}

      {/* Start get our app */}
      <Controls.Paper boxClassName={classes.getAppPaperBox}>
        <Grid container style={{ padding: 10 }}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" component="div">
              Get Our Android App Now
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ marginTop: 30 }}
            >
              Now Our Reviewia Mobile App is Available For You!
            </Typography>
            <div className={classes.getOurAppImages}>
              {/* <img style={{ cursor: "pointer" }} src={AppleStore} /> */}
              <img style={{ cursor: "pointer" }} src={PlayStore} />
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.getAppImageSection}>
            <img src={Phone} />
          </Grid>
        </Grid>
      </Controls.Paper>

      {/* End get our app */}
      <Footer></Footer>
    </div>
  );
}
