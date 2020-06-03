import React from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

export default function Review() {
  return (
    <Box bgcolor="#EBEEF1" p={2} display="block" width="95%">
      <Box display="flex">
        <Box
          color="primary.main"
          fontSize="subtitle1.fontSize"
          fontWeight="fontWeightLight"
          mb={1}
          display="inline"
          flexGrow={1}
        >
          fatthor
        </Box>
        <Box display="inline" alignContent="center">
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />
        </Box>
      </Box>
      <Box fontSize="h5.fontSize" fontWeight="fontWeightMedium" my={1.5}>
        Fresh Strawberries - 1lb
      </Box>
      <Box fontSize="body2.fontSize" fontWeight="fontWeightLight" my={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas
        erat nec eros semper, ut condimentum purus dignissim. Nam non massa non
        mauris fringilla eleifend. Nullam ligula odio, placerat in magna vitae,
        pulvinar vehicula augue. Pellentesque aliquet quam nibh, vitae semper
        augue sollicitudin ac. Maecenas rutrum urna turpis. Donec risus ligula,
        mollis sit amet massa eget, porttitor luctus diam. Vestibulum vulputate,
        arcu vel pellentesque sodales, nulla neque euismod ex, rhoncus vulputate
        nunc arcu quis dolor. Praesent imperdiet facilisis fermentum. Aliquam
        aliquet est elit, in auctor arcu tristique sed.
      </Box>
    </Box>
  );
}
