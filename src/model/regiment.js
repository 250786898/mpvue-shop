import { post } from '@/http/api'
class RegimentModel {
  constructor () {}

  judgeIsApply(){
    return post ({
      url:"store/data/judgeIsApplyStore"
    })
  }
}
export default RegimentModel
