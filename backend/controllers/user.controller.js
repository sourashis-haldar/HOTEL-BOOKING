
export const getUserdata=async(req,res)=>{
  try {
    const role=req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    return res.json({
      sucsess:true,
      role:role,
      recentSearchedCities: recentSearchedCities
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}



export const storerecentSeachCities=async(req,res)=>{
try {
  const { recentSearchedCities } = req.body;
  if(!recentSearchedCities){
    return res.json({
      success:false,
      message:"city are undfined"
    })
  }
  const user=await req.user;
  if (user.recentSearchedCities.length<3){
    user.recentSearchedCities.push(recentSearchedCities)
  }else{
    user.recentSearchedCities.shift();
    user.recentSearchedCities.push(recentSearchedCities)
  }
  await user.save();
  return res.json({
    success:true,
    message:"city added"
  })
} catch (error) {
  return res.json({
    success:false,
    message:error.message
  })
}
}