<?php

namespace Seppzzz\Scroll;

use SilverStripe\Core\Extension;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\Dev\Debug;

class HTMLEditorFieldExtension extends Extension {
	
	/**
	* Generate a unique identifier for the editor field.
	*
	* @return string The unique identifier.
	*/

	public function getUniqueIdentifier() {
		$record = $this->owner->getForm()->getRecord();
		if ( !$record ) {
			return null;
		}

		$className = $record->ClassName;
		$recordID = $record->ID;
		$fieldName = $this->owner->getName();

		$uniqueIdentifier = sprintf( '%s_%d_%s', $className, $recordID, $fieldName );

		return $uniqueIdentifier;
	}

	/**
	* Hook into the attributes of the field to add a unique identifier.
	*
	* @param array $attributes Reference to the field's attributes array.
	*/
	public function updateAttributes( &$attributes ) {

		$uniqueIdentifier = $this->getUniqueIdentifier();
		if ( $uniqueIdentifier ) {
			$attributes[ 'data-unique-identifier' ] = $uniqueIdentifier;
		}
	}
	
	
}