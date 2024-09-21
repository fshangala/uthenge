class SDK {
  /**
   * Creates a class to interact with the supabase client
   * @param {SupabaseClient} supabaseClient 
   */

  constructor(supabaseClient) {
    this.supabase=supabase
  }

  async storeManagementCreate(user_id,name) {
    /**
     * Create a store
     * @param {UUID} user_id
     * @param {String} name
     */
  }

}

export default SDK