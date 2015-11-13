<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Config;
use App\User;


class Community extends Model
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'hubgroups';
  protected $primaryKey = 'hubgroup_id';

  public function user() {
      return $this->belongsTo('User', 'user_id');
  }


  /**
   * Relationship for entries and communities
   *
   * @return collection
   */
  public function entries() {
    return $this->belongsToMany('App\Entry', 'tile_hubgroup_join', 'hubgroup_id', 'tile_id');
  }


  /**
  * Get the members of a group.
  * Groups belong to many users by way of the hubgroups_users table.
  *
  * @return collection
  */
  public function members()
  {
   	return $this->belongsToMany('App\User', 'hubgroups_users', 'hubgroup_id', 'user_id');
  }

  /**
  * Get the cover image url based on app environment
  *
  * @return string
  */
  public function getCover() {

		if ($this->cover_img!='') {
			$cover_img = Config::get('services.cdn.default').'/uploads/hubgroups/'.$this->hubgroup_id.'/'.$this->cover_img;
		} else {
			$cover_img = Config::get('services.cdn.default').'/img/covers/default-heart-cover.jpg';
		}
		return $cover_img;
	}


  /**
  * Get the logo image url based on app environment
  *
  * @return string
  */
  public function getLogo() {

		if ($this->logo) {
			return Config::get('services.cdn.default').'/uploads/hubgroups/'.$this->hubgroup_id.'/'.$this->logo;
		} else {
			return null;
		}
	}

  /**
  * Get the profile image url based on app environment
  *
  * @return string
  */
	public function getProfileImg() {

		if ($this->profile_img) {
			return Config::get('app.cdn.default').'/uploads/hubgroups/'.$this->hubgroup_id.'/'.$this->profile_img;
		} else {
			return null;
		}
	}

  /**
   * scopeEntriesInCommunity
   * Get all entries that are in the current community
   *
   * @param       $query
   * @param array $categoryIdListing
   *
   * @return mixed
   * @version v1.0
   */
  public function scopeEntriesInCommunity($query)
  {
      return $query->whereIn( 'category_id', $categoryIdListing );
  }


}
