
  const handleSoundChange = (name, value) => {
    console.log({ name, value })
    setSound((prevValue) => ({ ...sound, [name]: value }))
    console.log(sound)
  }

  export default handleSoundChange;