import http from '../api/http'

async function uploadProof(
  file: File,
  matchId: number,
  role: 'seller' | 'buyer'
) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('post_id', matchId.toString())
  formData.append('role', role)

  const res = await http.post('/custom/v1/payment-proof', formData)

  console.log('RESPONSE', res)
}

export default uploadProof
