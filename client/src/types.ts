export type Books = {
	ISBN: string,
	title: string,
	description: string,
	authors: string[],
	borrowerId: string[],
	adminId: string[]
}

export type BasicTable = {
	filter: Books[]
  }