// external-imports
import { Button, Checkbox, Input, Label, Spinner, TextArea, TextField } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';

// type-imports
import type { Snippet } from '@/types/snippet';

// type for snippet form props
type SnippetFormProps = {
  initialData?: Snippet;
  onSubmit: (data: Snippet) => void;
  isSubmitting: boolean;
};

// function to render the snippet form
export default function SnippetForm({ initialData, onSubmit, isSubmitting }: SnippetFormProps) {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // state to manage the form data
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [language, setLanguage] = useState(initialData?.language ?? '');
  const [code, setCode] = useState(initialData?.code ?? '');
  const [tags, setTags] = useState(initialData?.tags ?? '');
  const [favourite, setFavourite] = useState(initialData?.favourite ?? false);

  // check if we are editing an existing snippet or creating a new one
  const isEditing = initialData !== undefined;

  // validate the form data
  const isValid = title.trim().length > 0 && language.trim().length > 0 && code.trim().length > 0;

  // function to handle form submission
  function handleSubmit() {
    onSubmit({
      title: title.trim(),
      language: language.trim(),
      code: code.trim(),
      tags: tags.trim(),
      favourite,
    });
  }

  return (
    <View className="gap-y-4">
      <TextField isRequired isDisabled={isSubmitting}>
        <Label>Title</Label>
        <Input placeholder="Enter snippet title" value={title} onChangeText={setTitle} />
      </TextField>

      <TextField isRequired isDisabled={isSubmitting}>
        <Label>Language</Label>
        <Input placeholder="Enter snippet language" value={language} onChangeText={setLanguage} />
      </TextField>

      <TextField isRequired isDisabled={isSubmitting}>
        <Label>Code</Label>
        <TextArea placeholder="Enter snippet code" value={code} onChangeText={setCode} />
      </TextField>

      <TextField isDisabled={isSubmitting}>
        <Label>Tags</Label>
        <Input placeholder="Enter snippet tags" value={tags} onChangeText={setTags} />
      </TextField>

      <View className="flex-row items-center gap-x-2">
        <Label isDisabled={isSubmitting}>Mark as favourite</Label>
        <Checkbox
          isSelected={favourite}
          onSelectedChange={setFavourite}
          isDisabled={isSubmitting}
        />
      </View>

      <Button variant="outline" onPress={handleSubmit} isDisabled={!isValid || isSubmitting}>
        {isSubmitting ? (
          <Spinner size="md" color={iconColor} />
        ) : isEditing ? (
          'Update Snippet'
        ) : (
          'Create Snippet'
        )}
      </Button>
    </View>
  );
}
