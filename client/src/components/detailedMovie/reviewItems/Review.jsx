import { Typography, Box, styled } from "@mui/material"
const ReviewAuthor = styled(Typography)`
  margin-top: 1px;
  margin-left: 5px;
  font-weight: 700;
  color: #000;
//   &:hover {
//     color: rgb(1, 180, 228);
//   }
`;
const ReviewDate = styled(Typography)`
  margin-top: 1px;
  margin-left: 5px;
  font-weight: 300;
  font-size:12px;
  color: #000;
//   &:hover {
//     color: rgb(1, 180, 228);
//   }
`;
const SubContainer = styled(Box)`
    display:flex;
    flex-direction:column;

`

const Review = (review) => {

    return (
        <>
        
        <Box style = {{display:'flex', flexDirection:'row', marginBottom:'10px',padding: '20px' ,border:'1px solid rgba(227,227,227,1)',borderRadius:'10px',boxShadow : '5px 1px 5px 1px rgb(0 0 0.2/ 0.2)'}}>
        <Box style={{  display:'inline-block'  }} >
        <img src={review.review.imageSrc}alt="Movie Poster" style={{ minHeight: '64px', minWidth: '64px',maxWidth:'64px', borderRadius:'60px',  }} />
        </Box>
        <Box style = {{display:'inline-block'  }}>
        <SubContainer>
            <ReviewAuthor>{review.review.name}</ReviewAuthor>
            <ReviewDate>{review.review.date}</ReviewDate>
            <Typography style={{marginLeft:'5px', fontWeight:'400', fontSize:'15px',marginTop:'14px'}} >{review.review.content}</Typography>
        </SubContainer>
        </Box>
        </Box>
        </>
    )
}
export default Review;