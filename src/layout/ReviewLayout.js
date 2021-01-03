import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider, Grid } from "@material-ui/core";
import { FormContext } from "../provider/FormProvider";

const ReviewLayout = () => {
  const classes = useStyles();
  const { items, totals } = useContext(FormContext);
  const [itemArray] = items;
  const [total] = totals;

  const formatNumber = (number) => {
    const num = number.toString();
    const length = num.length - 1;
    if (length >= 3) {
      const mod = length % 3;
      if (mod > 0) {
        return num.substring(0, mod+1) + "." + num.substring(mod+1);
      } else if (length / 3 === 1) {
        return num.substring(0, 1) + "." + num.substring(1);
      } else {
        let i = 0;
        let output = "";
        while (i < length / 3) {
          const index = i * 3;
          if (index === 0) {
            output += num.substring(0, 1) + "." + num.substring(1, 3);
          } else if (i + 1 === length / 3) {
            output +=
              num.substring(index, index + 1) + "." + num.substring(index + 1);
          } else {
            output +=
              num.substring(index, index + 1) +
              "." +
              num.substring(index + 1, index + 3);
          }
          i++;
        }
        return output;
      }
    } else {
      return num;
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.reviewText}>
        Tinjau pesanan Anda
      </Typography>
      <Divider />
      {itemArray.length > 0 &&
        itemArray.map((item, index) => (
          <Grid
            key={index}
            container
            wrap="noWrap"
            spacing={2}
            className={classes.itemList}
          >
            <Grid item xs={8}>
              <Typography variant="body1" className={classes.itemText}>
                {`${item.name} x ${formatNumber(Number(item.quantity))}`}
              </Typography>
              {item.desc !== "" && <>
                <Typography variant="body2" className={classes.totalText}>
                  Catatan:
                </Typography>
                <Typography variant="body2" className={classes.descText}>
                  {item.desc}
                </Typography>
              </>}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" className={classes.priceText}>
                {`Rp${formatNumber(Number(item.price) * Number(item.quantity))}`}
              </Typography>
            </Grid>
          </Grid>
        ))}
      {/* <Grid container wrap="noWrap" spacing={2} className={classes.itemList}>
        <Grid item xs={8}>
          <Typography variant="body1" className={classes.itemText}>
            Lorem ipsum dolor si amet abcde defghi kj x 1
          </Typography>
          <Typography variant="body2" className={classes.totalText}>
            Notes:
          </Typography>
          <Typography variant="body2" className={classes.descText}>
          Quisque egestas egestas leo, sed molestie est pulvinar ut. Maecenas vel nulla ultricies, suscipit purus non, vehicula diam. Maecenas blandit malesuada ligula
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.priceText}>
            Rp 123450
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="noWrap" spacing={2} className={classes.itemList}>
        <Grid item xs={8}>
          <Typography variant="body1" className={classes.itemText}>
            Lorem ipsum dolor si amet abcde defghi kj x 1
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.priceText}>
            Rp 123450
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="noWrap" spacing={2} className={classes.itemList}>
        <Grid item xs={8}>
          <Typography variant="body1" className={classes.itemText}>
            Lorem ipsum dolor si amet abcde defghi kj x 1
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.priceText}>
            Rp 123450
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="noWrap" spacing={2} className={classes.itemList}>
        <Grid item xs={8}>
          <Typography variant="body1" className={classes.itemText}>
            Lorem ipsum dolor si amet abcde defghi kj x 1
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.priceText}>
            Rp 123450
          </Typography>
        </Grid>
      </Grid> */}
      <Divider className={classes.divider} />
      <Grid container wrap="noWrap" spacing={2} className={classes.itemList}>
        <Grid item xs={8}>
          <Typography variant="body1" className={classes.itemText}>
            JUMLAH BARANG
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.priceText}>
            {formatNumber(Number(total.quantity))}
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="noWrap" spacing={2} className={classes.itemList}>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.totalText}>
            JUMLAH HARGA
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" className={classes.totalPriceText}>
          {`Rp${formatNumber(Number(total.price))}`}
          </Typography>
        </Grid>
      </Grid>
      {/* <Box className={classes.price}>
      <Typography variant="body1" className={classes.itemText}>
        Lorem ipsum dolor si amet abcde defghi kj
      </Typography>
      <Typography variant="body1" className={classes.priceText}>
        Rp 123450
      </Typography>
      </Box> */}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 8,
  },
  reviewText: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 8,
    paddingTop: 0,
  },
  price: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  priceText: {
    textAlign: "right",
  },
  totalText: {
    fontWeight: "bold",
  },
  totalPriceText: {
    textAlign: "right",
    fontWeight: "bold",
  },
  descText: {
    fontStyle: "italic",
  },
  itemList: {
    marginTop: 4,
  },
  divider: {
    marginTop: 8,
  },
}));

export default ReviewLayout;
